import Workflow from "./workflow";

const AllWorkflows = () => {
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col gap-4 p-6">
        <Workflow
          name="Test workflow"
          id="testing-workflow"
          description="Test successful"
          publish={false}
        />
        <Workflow
          name="Test workflow"
          id="testing-workflow"
          description="Test successful"
          publish={false}
        />
        <Workflow
          name="Test workflow"
          id="testing-workflow"
          description="Test successful"
          publish={false}
        />
      </section>
    </div>
  );
};

export default AllWorkflows;
