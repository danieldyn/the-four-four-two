import GuessInput from "../components/GuessInput"
import GuessHistory from "../components/GuessHistory"

export default function GamePage() {
  return (
    <div>

        <h1>France vs Italy</h1>
        <p>World Cup Final - 9 July 2006</p>

        <GuessInput />

        <GuessHistory />

    </div>
  )
}
