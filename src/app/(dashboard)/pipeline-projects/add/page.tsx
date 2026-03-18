import { ProjectForm } from './project-form';

export default function AddPipelineProjectPage() {
  return (
    <div className="p-4 sm:p-6 max-w-[1700px] mx-auto min-h-[calc(100vh-theme(spacing.16))] w-full">
      <ProjectForm />
    </div>
  );
}
