import { ResizablePanel } from "@/shared/ui/resizable-panel";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ResizablePanel> = {
    title: "Shared/ResizablePanel",
    component: ResizablePanel,
};

export default meta;
type Story = StoryObj<typeof ResizablePanel>;

export const LeftPanel: Story = {
    args: {
        defaultWidth: 300,
        minWidth: 200,
        maxWidth: 600,
        side: "left",
    },
    render: (args) => {
        return (
            <div className="flex">
                <ResizablePanel {...args}>
                    <div className="h-full bg-gray-200 flex items-center justify-center">
                        Resizable Panel Content
                    </div>
                </ResizablePanel>

                <div className="p-4 bg-gray-100">
                    <p>Main Content Area</p>
                </div>
            </div>
        );
    },
};

export const RightPanel: Story = {
    args: {
        defaultWidth: 300,
        minWidth: 200,
        maxWidth: 600,
        side: "right",
    },
    render: (args) => {
        return (
            <div className="flex">
                <div className="p-4 bg-gray-100">
                    <p>Main Content Area</p>
                </div>

                <ResizablePanel {...args}>
                    <div className="h-full bg-gray-200 flex items-center justify-center">
                        Resizable Panel Content
                    </div>
                </ResizablePanel>
            </div>
        );
    },
};
