import type { Division } from './types'
import { roundToFirstDigit, formatKoreanNumber, getHumanFriendlyDomain } from './utils'
import { UserIcon, MapIcon, LinkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface DivisionCardProps {
  division: Division
}

function DivisionCard({ division }: DivisionCardProps) {
  function getTypeBadgeClass(type: Division['type']) {
    switch (type) {
      case '특별시':
        return 'badge-primary'
      case '광역시':
        return 'badge-secondary'
      case '시':
        return 'badge-info'
      case '군':
        return 'badge-success'
      case '특별자치도':
        return 'badge-secondary'
      case '특별자치시':
        return 'badge-secondary'
      case '리':
        return 'badge-ghost'
      default:
        return 'badge-ghost'
    }
  }

  return (
    <div className="card bg-base-100 shadow-sm h-fit select-text">
      <figure>
        <img
          src={division.image || 'https://placecats.com/800/600'}
          alt={division.name}
          title={division.imageAttribution || undefined}
          className="w-full aspect-[4/3] object-cover select-none"
        />
      </figure>
      <div className="card-body">
        <div className="mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="card-title m-0">{division.name}</h2>
            <span className={`badge badge-soft badge-sm ${getTypeBadgeClass(division.type)}`}>
              {division.type}
            </span>
          </div>
          {/* Only show firstLevelDivision if it's present and not a top-level region type */}
          {division.firstLevelDivision &&
            !['특별시', '광역시', '특별자치도', '특별자치시'].includes(division.type) && (
              <div className="text-sm text-base-content/70 mt-1">{division.firstLevelDivision}</div>
            )}
        </div>

        {division.highlights && (
          <ul className="list-disc list-inside mb-4">
            {division.highlights.map((highlight, highlightIndex) => (
              <li key={highlightIndex}>{highlight}</li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base-content/70 text-sm">
          <div className="flex items-center gap-1">
            <UserIcon className="w-4 h-4" />약{' '}
            {formatKoreanNumber(roundToFirstDigit(division.population))} 명
          </div>
          <div className="flex items-center gap-1">
            <MapIcon className="w-4 h-4" />
            {Math.round(division.area) < 1 ? '<1' : Math.round(division.area).toLocaleString()} km²
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
          {division.info && (
            <div className="flex items-start gap-1">
              <InformationCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{division.info}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DivisionCard
