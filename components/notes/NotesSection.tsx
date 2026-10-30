'use client'

import { useState, useEffect } from "react";
import AddNoteForm from "./AddNoteForm";
import NotesList from "./NotesList";

export interface Note {
    id: string;
    claimId: string;
    userId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

interface NotesSectionProps {
    claimId: string;
    userId: string;
}

/**
 * Displays and manages the notes for a specific claim. Fetches the notes and refreshes the list 
 * when notes are added, updated, or deleted.
 */
function NotesSection({ claimId, userId }: NotesSectionProps) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch all notes for the claim
    async function fetchNotes() {
        try {
            const res = await fetch(`/api/claims/${claimId}/notes`);

            if (!res.ok) { throw new Error('Failed to load notes') }

            const data = await res.json();
            setNotes(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // Load notes when the component mounts or when the claim changes
    useEffect(() => {
        fetchNotes();
    }, [claimId]);

    return (
        <section className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Notes</h2>
                <p className="mt-1 text-[15px] text-gray-600">Add and manage notes related to this claim</p>
            </div>

            <AddNoteForm claimId={claimId} userId={userId} fetchNotes={fetchNotes} />

            <div className="mt-5">
                {loading ?
                    <p className="text-sm text-gray-500">Loading notes...</p>
                    :
                    <NotesList notes={notes} fetchNotes={fetchNotes} />}
            </div>
        </section>
    )
}

export default NotesSection;