import { Box, Flex, Text } from '@totejs/uikit';

interface RowProps {
  name: string;
  value: any;
}

function Row(props: RowProps) {
  const { name, value } = props;
  return (
    <Flex mt={6}>
      <Text fontWeight={600} width={112} flexShrink={0} display="inline-block">
        {name}:
      </Text>
      <Text display="inline-block">{value + ''}</Text>
    </Flex>
  );
}

interface PropItem {
  name: string;
  required: boolean;
  type: string;
  default: string | boolean;
  desc: string;
}

interface PropsTableProps {
  data: Array<PropItem>;
}

export default function PropsTable(props: PropsTableProps) {
  const { data } = props;

  return (
    <Box mt={12}>
      {data.map((item, index) => {
        return (
          <Box key={index} py={12} borderBottom="1px solid" borderColor="readable.border">
            <Box>
              <Box
                bg="scene.primary.opacity"
                color="scene.primary.normal"
                as="span"
                py={4}
                px={8}
                borderRadius={4}
              >
                {item.name}
              </Box>
              {item.required && (
                <Box
                  ml={16}
                  bg="scene.warning.opacity"
                  color="scene.warning.normal"
                  as="span"
                  py={4}
                  px={8}
                  borderRadius={4}
                >
                  required
                </Box>
              )}
            </Box>
            <Box>
              {item.type !== undefined && <Row name="Type" value={item.type} />}
              {item.default !== undefined && <Row name="Default" value={item.default} />}
              {item.desc !== undefined && <Row name="Description" value={item.desc} />}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
