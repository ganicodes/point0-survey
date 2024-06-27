import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { ReactElement } from "react";

export function TabsDemo({
  tabs,
  defaultValue,
}: {
  tabs: { label: string; value: string; component: ReactElement }[];
  defaultValue: string;
}) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        {Array.isArray(tabs) &&
          tabs?.map((item, index) => (
            <TabsTrigger key={index} value={item?.value}>
              {item?.label}
            </TabsTrigger>
          ))}
      </TabsList>
      {Array.isArray(tabs) &&
        tabs?.map((item, index) => (
          <TabsContent value={item?.value}>{item?.component}</TabsContent>
        ))}
    </Tabs>
  );
}
