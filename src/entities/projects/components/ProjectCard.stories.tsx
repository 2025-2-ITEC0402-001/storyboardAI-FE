import { MemoryRouter } from "react-router-dom";

import { ProjectCard } from "./ProjectCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProjectCard> = {
    title: "Entities/ProjectCard",
    component: ProjectCard,

    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
    args: {
        id: "1",
        title: "My First Project",
        description: "This is a brief description of my first project.",
    },

    render: (args) => (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProjectCard {...args} />
        </ul>
    ),
};
