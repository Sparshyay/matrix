import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function TeamCard({ member }) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base">{member.name}</CardTitle>
          <p className="text-xs text-muted-foreground">{member.role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 text-sm">
          {member.socials?.github && (
            <Link className="text-muted-foreground hover:text-foreground" href={member.socials.github} target="_blank">
              GitHub
            </Link>
          )}
          {member.socials?.twitter && (
            <Link className="text-muted-foreground hover:text-foreground" href={member.socials.twitter} target="_blank">
              Twitter
            </Link>
          )}
          {member.socials?.dribbble && (
            <Link className="text-muted-foreground hover:text-foreground" href={member.socials.dribbble} target="_blank">
              Dribbble
            </Link>
          )}
          {member.socials?.linkedin && (
            <Link className="text-muted-foreground hover:text-foreground" href={member.socials.linkedin} target="_blank">
              LinkedIn
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


