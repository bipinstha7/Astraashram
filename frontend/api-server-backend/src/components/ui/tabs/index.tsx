import * as Tabs from '@radix-ui/react-tabs';

import styles from './tabs.module.scss';

interface iTabsList {
  defaultValue?: string;
  data: { name: string; content: React.ReactNode }[];
}

export default function TabsList({ data, defaultValue }: iTabsList) {
  return (
    <Tabs.Root className={styles.tabs_root} defaultValue={defaultValue || data[0].name}>
      <Tabs.List aria-label="pricing tab list">
        {data.map(tab => (
          <Tabs.Trigger key={tab.name} className={styles.tabs_trigger} value={tab.name}>
            {tab.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {data.map(tab => (
        <Tabs.Content key={tab.name} value={tab.name}>
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
