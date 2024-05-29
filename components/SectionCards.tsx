import { CardTypes } from "@/types/card";
import Card from "./Card";
import { Skeleton } from "./ui/skeleton";
import { random } from "lodash";

export function SectionCards({
  title,
  description,
  cards,
  isLoading,
}: {
  title: string;
  description: string;
  cards: CardTypes[];
  isLoading?: boolean;
}) {
  return (
    <section className="w-full py-12">
      <div className=" px-0 grid gap-6 md:gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-3xl font-semibold tracking-tight text">
              {title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 min-[767px]:grid-cols-2 sm:grid-cols-1 gap-8">
          {cards?.length > 0 &&
            cards.map((card: CardTypes) => {
              if (!card?.show) return null;

              return (
                <div key={card._id} className="grid gap-4 relative group">
                  <Card {...card} />
                </div>
              );
            })}

          {isLoading && (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
