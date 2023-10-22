export default interface ClockData {
  id: string
  name: string
  segmentCount: number
  highestFilledSegmentIndex: number // -1 means no segments are filled
}
