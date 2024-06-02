import ActionType from 'enums/ActionType'
import Position from 'enums/Position'
import RollResultType from 'enums/RollResultType'
import RollType from 'enums/RollType'

export const position = {
  [Position.Steady]: 'You have an advantage.',
  [Position.Risky]: 'You take a dangerous chance.',
  [Position.Desperate]: 'You’re in serious trouble.',
  [Position.Hopeless]: 'You’re fucked.',
}

export const actionType = {
  [ActionType.Risky]: 'You take a dangerous chance.',
  [ActionType.Desperate]: 'You increase exposure for a benefit.',
  [ActionType.Safe]: 'You limit your exposure at a cost.',
  [ActionType.Hopeless]: 'You’re fucked.',
}

export const hopeless = (
  <>
    You’re going to have to change your approach, or the keeper will take actions which you must <strong>resist</strong>{' '}
    in order to act at all.
  </>
)

export const rollResults = {
  [RollType.Resistance]: {
    [RollResultType.Critical]: 'Clear 1 luck.',
    [RollResultType.StrongHit]: 'Mark 0 luck.',
    [RollResultType.WeakHit]: 'Mark 2 luck.',
    [RollResultType.Miss]: 'Mark 4 luck.',
  },
  [RollType.Fortune]: {
    [RollResultType.Critical]: 'Critical!',
    [RollResultType.StrongHit]: 'Strong hit!',
    [RollResultType.WeakHit]: 'Weak Hit.',
    [RollResultType.Miss]: 'Miss.',
  },
}

export const originalActionRollResults = {
  [RollType.Action]: {
    [Position.Steady]: {
      [RollResultType.Critical]: (
        <>
          You accomplish more than expected, and some aspect of the <strong>dark conspiracy</strong> is revealed to you.
        </>
      ),
      [RollResultType.StrongHit]: <>You accomplish more than expected.</>,
      [RollResultType.WeakHit]: (
        <>
          You accomplish more than expected, but there’s a <strong>minor consequence</strong>.
        </>
      ),
      [RollResultType.Miss]: (
        <>
          You lose your advantage. Press on by seizing a <strong>risky</strong> opportunity, or withdraw and try a
          different approach.
        </>
      ),
    },
    [Position.Risky]: {
      [RollResultType.Critical]: (
        <>
          You succeed as if in a steady position. If you were searching for a clue, you may get a{' '}
          <strong>void clue</strong>.
        </>
      ),
      [RollResultType.StrongHit]: <>You do it.</>,
      [RollResultType.WeakHit]: (
        <>
          You do it, but there’s one or more <strong>minor consequences</strong> or a <strong>major consequence</strong>
          .
        </>
      ),
      [RollResultType.Miss]: (
        <>
          Things go badly and there’s a <strong>major consequence</strong>.
        </>
      ),
    },
    [Position.Desperate]: {
      [RollResultType.Critical]: (
        <>
          You succeed as if in a <strong>risky</strong> position. If you were searching for a clue, you may get a{' '}
          <strong>void clue</strong>.
        </>
      ),
      [RollResultType.StrongHit]: <>You do it, sort of. More remains to be done.</>,
      [RollResultType.WeakHit]: (
        <>
          You do it, sort of - but there’s a <strong>major consequence</strong>.
        </>
      ),
      [RollResultType.Miss]: (
        <>
          Things break bad. This is the worst result. There’s one or more <strong>major consequences</strong>.
        </>
      ),
    },
  },
}

export const revisedActionRollResults = {
  [RollType.Action]: {
    [ActionType.Safe]: {
      [RollResultType.Critical]: (
        <>
          You succeed with <strong>standard impact</strong>. If you were searching for a clue, you may find a{' '}
          <strong>void clue</strong>.
        </>
      ),
      [RollResultType.StrongHit]: (
        <>
          You do it with <strong>reduced impact</strong>.
        </>
      ),
      [RollResultType.WeakHit]: (
        <>
          You do it with <strong>reduced impact</strong> and a <strong>reduced consequence</strong>.
        </>
      ),
      [RollResultType.Miss]: (
        <>
          You’re exposed. Press on by <strong>taking a risky action</strong> or withdraw and try a different approach.
        </>
      ),
    },
    [ActionType.Risky]: {
      [RollResultType.Critical]: (
        <>
          You succeed with <strong>increased impact</strong>. If you were searching for a clue, you may find a{' '}
          <strong>void clue</strong>.
        </>
      ),
      [RollResultType.StrongHit]: (
        <>
          You do it. <em>Describe how</em>.
        </>
      ),
      [RollResultType.WeakHit]: (
        <>
          You do it, but there is a <strong>standard consequence</strong>.
        </>
      ),
      [RollResultType.Miss]: (
        <>
          Things go badly and there are one or more <strong>standard consequences</strong>.
        </>
      ),
    },
    [ActionType.Desperate]: {
      [RollResultType.Critical]: (
        <>
          You succeed with <strong>increased impact</strong>, and some aspect of the <strong>dark conspiracy</strong> is
          revealed to you.
        </>
      ),
      [RollResultType.StrongHit]: (
        <>
          You do it with <strong>increased impact</strong>.
        </>
      ),
      [RollResultType.WeakHit]: (
        <>
          You do it with <strong>increased impact</strong> but there is a <strong>worse consequence</strong>.
        </>
      ),
      [RollResultType.Miss]: (
        <>
          Things break bad and there are one or more <strong>worse consequences</strong>.
        </>
      ),
    },
  },
}

export const originalShowdownRollResults = {
  [RollType.Showdown]: {
    [RollResultType.Critical]: (
      <>
        You were correct. Also, the situation is either less dangerous than expected, or you’ve found something specific
        that greatly mitigates the threat or ties it directly to the <strong>conspiracy</strong>.{' '}
        <em>
          When we cut to the action, your position is <strong>steady</strong>.
        </em>
      </>
    ),
    [RollResultType.StrongHit]: (
      <>
        Your theory is correct and your plan of approach is sound. You’re able to act on the exact answers you deduced.{' '}
        <em>
          When we cut to the action, your position is <strong>risky</strong>.
        </em>
      </>
    ),
    [RollResultType.WeakHit]: (
      <>
        You have a decent theory or plan of approach but have drawn some incorrect or incomplete conclusions. The keeper
        may invite you to work together to determine which questions were wrong, and what the truth really is, or they
        will show you in play.{' '}
        <em>
          When we cut to the action, your position is <strong>desperate</strong>.
        </em>
      </>
    ),
    [RollResultType.Miss]: (
      <>
        Your theory is full of holes or your approach isn’t well-considered. The keeper may invite you to work together
        to determine why your answers were wrong, or what the truth really is, or show you in play.{' '}
        <em>
          When we cut to the action, you start in a <strong>hopeless</strong> position and something has already gone
          wrong.
        </em>
      </>
    ),
  },
}

export const revisedShowdownRollResults = {
  [RollType.Showdown]: {
    [RollResultType.Critical]: (
      <>
        You were correct. The situation is either less dangerous than expected, or you’ve found something specific that
        greatly mitigates the threat or ties it directly to the <strong>conspiracy</strong>.{' '}
      </>
    ),
    [RollResultType.StrongHit]: (
      <>Your theory is correct and your approach is sound. You are able to act on the exact answers you deducted.</>
    ),
    [RollResultType.WeakHit]: (
      <>Your have a decent theory or plan of approach but have drawn some incorrect or incomplete conclusions.</>
    ),
    [RollResultType.Miss]: (
      <>
        Your theory is full of holes and your approach isn’t well-considered.
        <em>When we cut to the action, something has already gone very wrong.</em>
      </>
    ),
  },
}
