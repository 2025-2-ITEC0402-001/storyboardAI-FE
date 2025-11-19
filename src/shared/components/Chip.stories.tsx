import { Chip } from "@/shared/components/Chip";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Chip> = {
    title: "Shared/Chip",
    component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
    args: {
        children: "안녕하세요",
    },
};
