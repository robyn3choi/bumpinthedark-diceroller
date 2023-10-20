export default function Footer() {
  return (
    <div className="text-yellow p-4 absolute bottom-1 text-center w-full">
      This is an online dice roller for{' '}
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
