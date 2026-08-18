export interface ProfileCardProps {
    avatar: string;
    full_name: string;
    role: string;
    bio: string;
}

export const info = {
    avatar: "https://i.pravatar.cc/150?img=12",
    full_name: "Alex Rivera",
    role: "Product Designer",
    bio: `Crafting simple, considered interfaces. Focused on clarity over
            decoration and the details most people skip.`
}

export interface SkillsProps {
    readonly items: readonly string[];
}

export const skills = ["UI Design", "Design Systems", "Prototyping", "Figma", "Motion"];
