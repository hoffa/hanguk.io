import type { Division } from './types'
import { roundToFirstDigit, formatKoreanNumber, getHumanFriendlyDomain } from './utils'
import {
  UserIcon,
  BuildingOfficeIcon,
  MapIcon,
  LinkIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'

interface DivisionCardProps {
  division: Division
}

function DivisionCard({ division }: DivisionCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm h-fit">
      <figure>
        <img
          src={division.image || 'https://placecats.com/800/600'}
          alt={division.name}
          className="w-full aspect-[4/3] object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="card-title">{division.name}</h2>
            {division.info && (
              <div className="tooltip" data-tip={division.info}>
                <InformationCircleIcon className="w-5 h-5 text-base-content/50 hover:text-base-content/80" />
              </div>
            )}
          </div>
        </div>

        {division.highlights && (
          <ul className="list-disc list-inside mb-4">
            {division.highlights.map((highlight, highlightIndex) => (
              <li key={highlightIndex}>{highlight}</li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base-content/70">
          <div className="flex items-center gap-1">
            <UserIcon className="w-4 h-4" />
            {formatKoreanNumber(roundToFirstDigit(division.population))} 명
          </div>
          <div className="flex items-center gap-1">
            <MapIcon className="w-4 h-4" />
            {Math.round(division.area).toLocaleString()} km²
          </div>
          <div className="flex items-center gap-1">
            <BuildingOfficeIcon className="w-4 h-4" />
            {division.type}
          </div>
          <div className="flex items-center gap-1">
            <LinkIcon className="w-4 h-4" />
            <a
              href={division.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {getHumanFriendlyDomain(division.link)}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DivisionCard
