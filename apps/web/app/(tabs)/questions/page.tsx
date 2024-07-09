import PageWrapper from "../../../components/PageWrapper";
import { TabsDemo } from "../../../components/Tabs";
import QuestionSet from "../../../components/question-set/QuestionSet";
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
            component: <QuestionSet />,
          },
        ]}
        defaultValue="Questions"
      />
    </PageWrapper>
  );
};

export default Questions;
