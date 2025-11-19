import { Spinner } from "@/shared/components/Spinner";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Spinner> = {
    title: "Shared/Spinner",
    component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
    args: {},
};
