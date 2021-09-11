import { parseISO, format } from "date-fns"

export default function Date({ dateString }: { dateString: string }) {
    const date: Date = parseISO(dateString)
    return (
        <time dateTime={dateString} className="regular-text">
            {format(date, "LLLL d, yyyy")}
        </time>
    )
}
