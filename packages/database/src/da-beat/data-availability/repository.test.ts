import { UnixTime } from '@l2beat/shared-pure'
import { expect } from 'earl'
import { describeDatabase } from '../../test/database'
import type { DataAvailabilityRecord } from './entity'
import { DataAvailabilityRepository } from './repository'

describeDatabase(DataAvailabilityRepository.name, (db) => {
  const repository = db.dataAvailability

  const START = UnixTime.now()

  describe(DataAvailabilityRepository.prototype.upsertMany.name, () => {
    it('adds new rows', async () => {
      await repository.upsertMany([
        record('a', START, 100),
        record('a', START.add(1, 'days'), 200),
        record('a', START.add(2, 'days'), 300),
      ])

      const results = await repository.getAll()
      expect(results).toEqualUnsorted([
        record('a', START, 100),
        record('a', START.add(1, 'days'), 200),
        record('a', START.add(2, 'days'), 300),
      ])
    })

    it('merges on conflict', async () => {
      await repository.upsertMany([
        record('a', START, 100),
        record('a', START.add(1, 'days'), 200),
      ])
      await repository.upsertMany([record('a', START, 150)])

      const results = await repository.getAll()
      expect(results).toEqualUnsorted([
        record('a', START, 150),
        record('a', START.add(1, 'days'), 200),
      ])
    })

    it('returns number of processed records', async () => {
      const records = [
        record('a', START, 100),
        record('a', START.add(1, 'days'), 200),
      ]
      const result = await repository.upsertMany(records)
      expect(result).toEqual(2)
    })

    it('returns 0 for empty array', async () => {
      const result = await repository.upsertMany([])
      expect(result).toEqual(0)
    })
  })

  describe(DataAvailabilityRepository.prototype.deleteAll.name, () => {
    it('should delete all rows', async () => {
      await repository.upsertMany([
        record('a', START, 100),
        record('a', START.add(1, 'days'), 200),
      ])

      const deleteResult = await repository.deleteAll()
      const results = await repository.getAll()

      expect(deleteResult).toEqual(2)
      expect(results).toEqual([])
    })
  })

  describe(DataAvailabilityRepository.prototype.deleteByProjectFrom
    .name, () => {
    it('should delete all rows after a given timestamp for a project', async () => {
      await repository.upsertMany([
        record('a', START, 100),
        record('a', START.add(1, 'days'), 200),
        record('a', START.add(2, 'days'), 300),
        record('b', START.add(2, 'days'), 400),
      ])

      const deleteResult = await repository.deleteByProjectFrom(
        'a',
        START.add(1, 'days'),
      )

      const results = await repository.getAll()

      expect(deleteResult).toEqual(2)
      expect(results).toEqualUnsorted([
        record('a', START, 100),
        record('b', START.add(2, 'days'), 400),
      ])
    })
  })

  describe(DataAvailabilityRepository.prototype.getByProjectAndTimeRange
    .name, () => {
    it('should return all rows in a given time range for a project', async () => {
      const records = [
        record('a', START, 100),
        record('a', START.add(1, 'days'), 200),
        record('a', START.add(2, 'days'), 300),
        record('b', START.add(1, 'days'), 400),
      ]

      await repository.upsertMany(records)

      const results = await repository.getByProjectAndTimeRange('a', [
        START.add(1, 'days'),
        START.add(2, 'days'),
      ])

      expect(results).toEqual([
        record('a', START.add(1, 'days'), 200),
        record('a', START.add(2, 'days'), 300),
      ])
    })
  })

  describe(DataAvailabilityRepository.prototype.getByProjectIdAndFrom
    .name, () => {
    it('should return all rows from given timestamp for a project', async () => {
      await repository.upsertMany([
        record('a', START, 100),
        record('a', START.add(1, 'days'), 200),
        record('a', START.add(2, 'days'), 300),
        record('b', START.add(1, 'days'), 400),
      ])

      const results = await repository.getByProjectIdAndFrom(
        'a',
        START.add(1, 'days'),
      )

      expect(results).toEqual([
        record('a', START.add(1, 'days'), 200),
        record('a', START.add(2, 'days'), 300),
      ])
    })
  })

  afterEach(async () => {
    await repository.deleteAll()
  })
})

function record(
  projectId: string,
  timestamp: UnixTime,
  totalSize: number,
): DataAvailabilityRecord {
  return {
    projectId: projectId,
    timestamp,
    totalSize,
  }
}
