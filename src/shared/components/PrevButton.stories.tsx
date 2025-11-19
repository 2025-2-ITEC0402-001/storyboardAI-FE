import { MemoryRouter } from "react-router-dom";

import { PrevButton } from "@/shared/components/PrevButton";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof PrevButton> = {
    title: "Shared/PrevButton",
    component: PrevButton,
};

export default meta;
type Story = StoryObj<typeof PrevButton>;

export const Default: Story = {
    args: {
        children: "뒤로가기",
    },
    render: () => {
        return (
            <MemoryRouter>
                <PrevButton />
            </MemoryRouter>
        );
    },
};
