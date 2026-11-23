type Version = readonly [major: number, minor: number, patch: number];

export interface IOSRisk {
  version: string;
  platform: 'iOS' | 'iPadOS';
}

// Bump this when the risk ranges or acknowledgement change.
export const IOS_RISK_POLICY_VERSION = 2;

// Lower bounds are inclusive and upper bounds are exclusive. The iOS 15 and 16
// upper bounds account for Apple's Coruna backports. 18.7.0 is the DarkSword
// cutoff for this warning policy.
// https://support.apple.com/en-us/126776
const riskRanges: ReadonlyArray<readonly [Version, Version]> = [
  [
    [13, 0, 0],
    [15, 8, 7],
  ],
  [
    [16, 0, 0],
    [16, 7, 15],
  ],
  [
    [17, 0, 0],
    [17, 3, 0],
  ],
  [
    [18, 4, 0],
    [18, 7, 1],
  ],
];

function compareVersions(a: Version, b: Version) {
  return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
}

export function detectIOSRisk(userAgent: string): IOSRisk | null {
  const device = userAgent.match(
    /^Mozilla\/5\.0 \((iPhone; CPU iPhone OS|iPad; CPU OS) (\d{1,2})_(\d{1,2})(?:_(\d{1,2}))? like Mac OS X\) AppleWebKit\/[\d.]+ \(KHTML, like Gecko\) Version\/(\d{1,2})(?:\.\d+)+ Mobile\/\w+ Safari\/[\d.]+$/,
  );
  if (!device) return null;

  const [, platformToken, majorText, minorText, patchText, safariMajor] = device;
  const major = Number(majorText);
  const minor = Number(minorText);
  const hasPatch = patchText !== undefined;
  const version: Version = [major, minor, Number(patchText ?? 0)];

  // Safari 26 can report a frozen 18.x OS token. The browser's own Version/
  // token still distinguishes it from Safari on iOS 18.
  // https://webkit.org/blog/17333/webkit-features-in-safari-26-0/#update-to-ua-string
  if (Number(safariMajor) !== major) return null;

  // With no patch number, the next minor version is the exclusive end of the reported series.
  const nextMinor: Version = [major, minor + 1, 0];
  const isAffected = riskRanges.some(
    ([from, until]) =>
      compareVersions(version, from) >= 0 &&
      (hasPatch ? compareVersions(version, until) < 0 : compareVersions(nextMinor, until) <= 0),
  );
  if (!isAffected) return null;

  return {
    version: version.slice(0, hasPatch ? 3 : 2).join('.'),
    platform: platformToken.startsWith('iPad') ? 'iPadOS' : 'iOS',
  };
}
