import { AppLogo } from "@/app/assets/AppLogo";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof AppLogo> = {
    title: "App/AppLogo",
    component: AppLogo,
};

export default meta;
type Story = StoryObj<typeof AppLogo>;

export const Default: Story = {
    args: {
        width: "40px",
        height: "40px",
    },
};
