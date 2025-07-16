import { onGetWorkflows } from "../_actions/workflow-connections";
import MoreCredits from "./more-credits";
import Workflow from "./workflow";
import WorkflowButton from "./workflow-button";

const AllWorkflows = async () => {
  const workflows = await onGetWorkflows();

  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col gap-4 p-6">
        <MoreCredits />
        {workflows?.length ? (
          workflows?.map((workflow) => (
            <Workflow
              key={workflow.id}
              name={workflow.name}
              id={workflow.id}
              description={workflow.description}
              publish={workflow.publish}
            />
          ))
        ) : (
          <div className="justify-center items-center flex h-96 text-muted-foreground flex-col gap-6">
            No workflows found. Create one to get started!
            <WorkflowButton title="Create workflow" />
          </div>
        )}
      </section>
    </div>
  );
};

export default AllWorkflows;
