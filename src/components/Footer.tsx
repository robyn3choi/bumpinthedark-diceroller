export default function Footer() {
  return (
    <div className="text-yellow p-4 pr-[5rem] sm:pr-4 absolute bottom-1 sm:text-center w-full">
      This is an online dice roller and clock tracker for{' '}
      <a
        className="underline hover:text-white"
        href="https://jexjthomas.itch.io/bump-in-the-dark"
        target="_blank"
        rel="noreferrer"
      >
        Bump in the Dark
      </a>
      , a tabletop roleplaying game by Jex Thomas.
    </div>
  )
}
