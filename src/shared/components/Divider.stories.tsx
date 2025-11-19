import { Divider } from "@/shared/components/Divider";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Divider> = {
    title: "Shared/Divider",
    component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
    args: {
        children: "간편 로그인",
    },
};
