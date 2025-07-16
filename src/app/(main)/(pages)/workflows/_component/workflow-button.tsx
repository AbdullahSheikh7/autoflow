"use client";

import WorkflowForm from "@/components/forms/workflow-form";
import CustomModal from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import { useBilling } from "@/providers/billing-provider";
import { useModal } from "@/providers/modal-provider";
import { Plus } from "lucide-react";
import React from "react";

type Props = { title?: string };

const WorkflowButton = ({ title }: Props) => {
  const { setOpen } = useModal();
  const { credits } = useBilling();

  const handleClick = () => {
    setOpen(
      <CustomModal
        title="Create a workflow automation"
        subheading="Workflows are a powerful tool that help you automate tasks"
      >
        <WorkflowForm />
      </CustomModal>
    );
  };
  return (
    <Button
      size={title ? "default" : "icon"}
      {...(credits === "0" ? { onClick: handleClick } : { disabled: true })}
    >
      <Plus />
      {title}
    </Button>
  );
};

export default WorkflowButton;
