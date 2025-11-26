import { Selector } from "@/shared/components/Selector";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Selector.Root> = {
    title: "shared/Selector",
    component: Selector.Root,
};

export default meta;
type Story = StoryObj<typeof Selector.Root>;

export const Default: Story = {
    args: {},
    render: (args) => {
        return (
            <Selector.Root {...args}>
                <Selector.Item value="영상 생성">영상 생성</Selector.Item>
                <Selector.Item value="이미지 편집">이미지 편집</Selector.Item>
            </Selector.Root>
        );
    },
};
