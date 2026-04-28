import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ClassDetails } from "@/types";
import { useShow } from "@refinedev/core";
import { AdvancedImage } from "@cloudinary/react";
import { bannerPhoto } from "@/lib/cloudinary";
import { User, BookOpen, Users, Building2 } from "lucide-react";

const Show = () => {
  const { query } = useShow<ClassDetails>({ resource: "classes" });

  const { data, isLoading, isError } = query;
  const classDetails = data?.data;

  if (isLoading || isError || !classDetails) {
    return (
      <ShowView className="class-view class-show">
        <ShowViewHeader title="Class Details" resource="classes" />

        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground text-lg">
            {isLoading
              ? "Loading class details..."
              : isError
              ? "Failed to load class details."
              : "Class not found."}
          </p>
        </div>
      </ShowView>
    );
  }

  const {
    name,
    description,
    bannerCldPubId,
    capacity,
    status,
    teacher,
    department,
    subject,
  } = classDetails;

  const teacherName = teacher?.name ?? "Unknown Teacher";
  const teacherInitials = teacherName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const placeholderUrl = `https://placehold.co/600x400?text=${encodeURIComponent(
    teacherInitials,
  )}&font=roboto`;

  return (
    <ShowView className="class-view class-show space-y-8">
      <ShowViewHeader title="Class Details" resource="classes" />

      {/* Banner */}
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-muted">
        {bannerCldPubId ? (
          <AdvancedImage
            cldImg={bannerPhoto(bannerCldPubId, name)}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/10 to-muted-foreground/10" />
        )}
      </div>

      <div className="max-w-4xl mx-auto px-1">
        <Card className="overflow-hidden border shadow-sm">
          {/* Header Section */}
          <div className="p-8 pb-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight">
                  {name}
                </h1>
                {description && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0">
                <Badge variant="outline" className="text-sm px-4 py-1.5">
                  <Users className="w-4 h-4 mr-2" />
                  {capacity} spots
                </Badge>

                <Badge
                  variant={status === "active" ? "default" : "secondary"}
                  className="capitalize text-sm px-4 py-1.5"
                >
                  {status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-10">
            {/* Instructor & Department */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Instructor */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <User className="w-5 h-5" />
                  INSTRUCTOR
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border bg-muted">
                    <img
                      src={teacher?.image ?? placeholderUrl}
                      alt={teacherName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-lg">{teacherName}</p>
                    <p className="text-sm text-muted-foreground">
                      {teacher?.email ?? "No email provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Department */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <Building2 className="w-5 h-5" />
                  DEPARTMENT
                </div>

                <div>
                  <p className="font-semibold">
                    {department?.name ?? "No department assigned"}
                  </p>
                  {department?.description && (
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {department.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Subject */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <BookOpen className="w-5 h-5" />
                SUBJECT
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="outline" className="text-base px-4 py-2">
                  {subject?.code}
                </Badge>
                <div>
                  <p className="font-medium text-lg">{subject?.name}</p>
                  {subject?.description && (
                    <p className="text-muted-foreground text-sm mt-1">
                      {subject.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Join Instructions */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">How to Join</h2>
                <ol className="space-y-4 text-[15px] text-muted-foreground">
                  <li className="flex gap-4">
                    <span className="font-mono bg-muted text-muted-foreground w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      Ask the instructor for an invitation link or code
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono bg-muted text-muted-foreground w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Click the "Join Class" button below</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono bg-muted text-muted-foreground w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Paste the invitation code and confirm</span>
                  </li>
                </ol>
              </div>

              <Button
                size="lg"
                className="w-full text-base py-7 font-medium rounded-xl"
              >
                Join This Class
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ShowView>
  );
};

export default Show;
