import ConnectionProvider from "@/providers/connection-provider";
import EditorProvider from "@/providers/editor-provider";
import EditorCanvas from "./_components/editor-canvas";

type Props = { params: Promise<{ id: string }> };

const Editor = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionProvider>
          <EditorCanvas id={id} />
        </ConnectionProvider>
      </EditorProvider>
    </div>
  );
};

export default Editor;
