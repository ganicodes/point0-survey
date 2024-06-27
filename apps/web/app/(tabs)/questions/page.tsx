import PageWrapper from "../../../components/PageWrapper";
import { TabsDemo } from "../../../components/Tabs";
import Question from "../../../components/questions/Question";

const Questions = () => {
  return (
    <PageWrapper title="Questions">
      <TabsDemo
        tabs={[
          {
            label: "Questions",
            value: "Questions",
            component: <Question />,
          },
          {
            label: "Question Set",
            value: "Set",
            component: <Question />,
          },
        ]}
        defaultValue="Questions"
      />
    </PageWrapper>
  );
};

export default Questions;
