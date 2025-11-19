import { AppLogoWithText } from "@/app/assets/AppLogoWithText";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof AppLogoWithText> = {
    title: "App/AppLogoWithText",
    component: AppLogoWithText,
};

export default meta;
type Story = StoryObj<typeof AppLogoWithText>;

export const Default: Story = {
    args: {},
};
