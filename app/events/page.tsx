import { EventList } from "@/components/events/EventList"

export default function Page() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <EventList />
    </div>
  )
}
