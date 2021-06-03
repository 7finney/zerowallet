import React, { useState } from 'react';
import { List } from 'react-native-paper';

interface INetwork {
  name: string;
  id: number;
}

export const NetworkList = () => {
  const [expanded, setExpanded] = useState(false);
  const [networks] = useState<INetwork[]>([
    {
      name: 'Main Network',
      id: 1,
    },
    {
      name: 'Goerli TestNet',
      id: 5,
    },
  ]);
  const [network, setNetwork] = useState<INetwork>(networks[1]);
  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Select Network">
      <List.Accordion
        title={network.name}
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        {networks.map(network => (
          <List.Item
            title={network.name}
            key={network.id}
            onPress={() => setNetwork(network)}
          />
        ))}
      </List.Accordion>
    </List.Section>
  );
};
