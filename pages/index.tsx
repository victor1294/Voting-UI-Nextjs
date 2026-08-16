import { useState } from 'react';

import {
  candidates,
  voters,
  Candidate,
  Voter,
} from './types/voting';


export default function Home() {

  const [selectedVoter, setSelectedVoter] =
    useState<Voter | ''>('');

  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | ''>('');

  const [votes, setVotes] = useState({
    Augustine: 0,
    Kosisochukwu: 0,
  });

  const [votedVoters, setVotedVoters] =
    useState<Voter[]>([]);

  const [showModal, setShowModal] =
    useState(false);




  const totalVotes =
    votes.Augustine +
    votes.Kosisochukwu;




  const handleVote = () => {

    if (!selectedVoter) {
      alert('Please select a voter.');
      return;
    }

    if (!selectedCandidate) {
      alert('Please select a candidate.');
      return;
    }

   

    if (votedVoters.includes(selectedVoter)) {
      alert(`${selectedVoter} has already voted.`);
      return;
    }



    setVotes((previousVotes) => ({
      ...previousVotes,

      [selectedCandidate]:
        previousVotes[selectedCandidate] + 1,
    }));


    

    setVotedVoters((previousVoters) => [
      ...previousVoters,
      selectedVoter,
    ]);



    setSelectedVoter('');
    setSelectedCandidate('');
  };




  const augustinePercentage =
    totalVotes > 0
      ? (votes.Augustine / totalVotes) * 100
      : 0;


  const kosisochukwuPercentage =
    totalVotes > 0
      ? (votes.Kosisochukwu / totalVotes) * 100
      : 0;




  let winner:
    | Candidate
    | 'Tie'
    | null = null;


  if (totalVotes > 0) {

    if (
      votes.Augustine >
      votes.Kosisochukwu
    ) {

      winner = 'Augustine';

    } else if (
      votes.Kosisochukwu >
      votes.Augustine
    ) {

      winner = 'Kosisochukwu';

    } else {

      winner = 'Tie';

    }
  }


  return (

    <main className="min-h-screen bg-slate-100">

   

      <header className="bg-slate-900 px-6 py-6 text-white">

        <div className="mx-auto max-w-5xl">

          <h1 className="text-3xl font-bold">
            Head of House Voting
          </h1>

          <p className="mt-2 text-slate-300">
            Cast your vote for your preferred candidate.
          </p>

        </div>

      </header>


  

      <main className="mx-auto max-w-5xl px-6 py-10">


  

        <section className="rounded-2xl bg-white p-7 shadow-md">

          <h2 className="text-2xl font-bold text-slate-900">
            Cast Your Vote
          </h2>

          <p className="mt-1 text-slate-500">
            Select a voter and choose a candidate.
          </p>


          <div className="mt-7 grid gap-6 md:grid-cols-2">



            <div>

              <label
                htmlFor="voter"
                className="mb-2 block font-semibold text-slate-700"
              >
                Voter
              </label>

              <select
                id="voter"
                value={selectedVoter}
                onChange={(e) =>
                  setSelectedVoter(
                    e.target.value as Voter
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
              >

                <option value="">
                  Select voter
                </option>


                {voters.map((voter) => (

                  <option
                    key={voter}
                    value={voter}
                    disabled={votedVoters.includes(voter)}
                  >

                    {voter}

                    {votedVoters.includes(voter)
                      ? ' (Voted)'
                      : ''
                    }

                  </option>

                ))}

              </select>

            </div>


           

            <div>

              <label
                htmlFor="candidate"
                className="mb-2 block font-semibold text-slate-700"
              >
                Candidate
              </label>

              <select
                id="candidate"
                value={selectedCandidate}
                onChange={(e) =>
                  setSelectedCandidate(
                    e.target.value as Candidate
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
              >

                <option value="">
                  Select candidate
                </option>


                {candidates.map((candidate) => (

                  <option
                    key={candidate}
                    value={candidate}
                  >
                    {candidate}
                  </option>

                ))}

              </select>

            </div>

          </div>


         

          <button
            onClick={handleVote}
            className="mt-7 w-full rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Cast Vote
          </button>

        </section>




        <section className="mt-10">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Election Results
            </h2>

            <p className="mt-1 text-slate-500">
              {totalVotes} / {voters.length} votes cast
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-2">



            <div className="rounded-2xl bg-white p-6 shadow-md">

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-bold">
                  Augustine
                </h3>

                <span className="rounded-full bg-orange-100 px-4 py-2 font-bold text-orange-700">

                  {votes.Augustine}

                </span>

              </div>


              <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-500"
                  style={{
                    width: `${augustinePercentage}%`,
                  }}
                />

              </div>

            </div>



            <div className="rounded-2xl bg-white p-6 shadow-md">

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-bold">
                  Kosisochukwu
                </h3>

                <span className="rounded-full bg-emerald-100 px-4 py-2 font-bold text-emerald-700">

                  {votes.Kosisochukwu}

                </span>

              </div>


              <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${kosisochukwuPercentage}%`,
                  }}
                />

              </div>

            </div>

          </div>



          <div className="mt-8 text-center">

            <button
              onClick={() => setShowModal(true)}
              className="rounded-lg bg-slate-900 px-8 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Check Result
            </button>

          </div>

        </section>

      </main>


   

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl">


         

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl">

              🏆

            </div>


            {/* TITLE */}

            <h2 className="mt-4 text-2xl font-bold text-slate-900">

              {totalVotes === 0
                ? 'Election Result'
                : winner === 'Tie'
                ? 'Election Tie'
                : `${winner} Wins!`
              }

            </h2>


        

            <p className="mt-3 text-slate-600">

              {totalVotes === 0 && (
                'No votes have been cast yet.'
              )}


              {winner === 'Tie' && (
                <>
                  Both candidates received{' '}
                  {votes.Augustine} votes.
                </>
              )}


              {winner === 'Augustine' && (
                <>
                  Augustine wins with{' '}
                  {votes.Augustine} votes out of{' '}
                  {totalVotes}.
                </>
              )}


              {winner === 'Kosisochukwu' && (
                <>
                  Kosisochukwu wins with{' '}
                  {votes.Kosisochukwu} votes out of{' '}
                  {totalVotes}.
                </>
              )}

            </p>


        

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </main>

  );
}