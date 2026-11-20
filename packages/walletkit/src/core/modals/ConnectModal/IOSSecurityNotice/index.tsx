import { useState } from 'react';
import { Box } from '@/core/base/components/Box';
import { Button } from '@/core/base/components/Button';
import { Link } from '@/core/base/components/Link';
import { ModalBody } from '@/core/base/components/Modal/ModalBody';
import { ModalFooter } from '@/core/base/components/Modal/ModalFooter';
import { ModalHeader } from '@/core/base/components/Modal/ModalHeader';
import { Text } from '@/core/base/components/Text';
import { ExternalLinkIcon } from '@/core/base/icons/ExternalLinkIcon';
import { ShieldAlertIcon } from '@/core/base/icons/ShieldAlertIcon';
import type { IOSRisk } from '@/core/modals/ConnectModal/iosRisk';
import {
  clsActions,
  clsBody,
  clsCancel,
  clsCheckbox,
  clsCheckboxInput,
  clsContinue,
  clsHeader,
  clsIcon,
  clsLink,
  clsRiskCopy,
  clsRiskPanel,
  clsShield,
} from './styles.css';

interface IOSSecurityNoticeProps {
  risk: IOSRisk;
  onContinue: () => void;
  onCancel: () => void;
}

export function IOSSecurityNotice({ risk, onContinue, onCancel }: IOSSecurityNoticeProps) {
  // Each new attempt receives a fresh match, so closing without accepting clears the checkbox.
  const [checkedRisk, setCheckedRisk] = useState<IOSRisk | null>(null);
  const isChecked = checkedRisk === risk;

  return (
    <>
      <ModalHeader as="h2" className={clsHeader} lang="en">
        <ShieldAlertIcon className={clsShield} aria-hidden="true" />
        <Box as="span">Update {risk.platform}</Box>
      </ModalHeader>

      <ModalBody className={clsBody} lang="en">
        <Box className={clsRiskPanel}>
          <Text className={clsRiskCopy}>
            Your device is running{' '}
            <strong>
              {risk.platform} {risk.version}
            </strong>
            , which has known security vulnerabilities. Install the latest {risk.platform} update
            available for your device to help keep your device and wallet secure.
          </Text>
          <Link
            className={clsLink}
            href="https://support.apple.com/en-us/118575"
            rel="noopener noreferrer"
            aria-label={`How to update ${risk.platform} on Apple Support (opens in a new tab)`}
          >
            How to update {risk.platform}
            <ExternalLinkIcon className={clsIcon} aria-hidden="true" />
          </Link>
        </Box>

        <Box as="label" className={clsCheckbox}>
          <input
            className={clsCheckboxInput}
            type="checkbox"
            checked={isChecked}
            onChange={(event) => setCheckedRisk(event.currentTarget.checked ? risk : null)}
          />
          <Box as="span">I understand the risks of continuing without updating.</Box>
        </Box>

        <ModalFooter className={clsActions}>
          <Button type="button" className={clsCancel} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            className={clsContinue}
            disabled={!isChecked}
            onClick={() => isChecked && onContinue()}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalBody>
    </>
  );
}
