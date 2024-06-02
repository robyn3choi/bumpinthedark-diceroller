export default function Footer() {
  return (
    <div className="text-yellow p-4 pr-[5rem] sm:pr-4 absolute bottom-1 sm:text-center w-full text-sm sm:text-base">
      <p>
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
      </p>
      <p className="mt-1.5">
        Created by{' '}
        <a className="underline hover:text-white" href="https://linktr.ee/bitbirdy" target="_blank" rel="noreferrer">
          Robyn Choi
        </a>
        .
      </p>
    </div>
  )
}
