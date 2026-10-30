'use client'

import { useState } from "react";

interface AddNoteFormProps {
    claimId: string;
    userId: string;
    fetchNotes: () => void;
}

/**
 * Form to add a new note to a specific claim. Refreshes the notes list after submission.
 */
function AddNoteForm({ claimId, userId, fetchNotes }: AddNoteFormProps) {
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);

    // Handles form submission to create a new note
    async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
        evt.preventDefault();
        if (!content.trim()) return;

        try {
            setSaving(true);

            const res = await fetch(`/api/claims/${claimId}/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, content })
            })

            if (!res.ok) { throw new Error('Failed to create note') }

            setContent('');
            fetchNotes();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
                value={content}
                onChange={(evt) => setContent(evt.target.value)}
                placeholder="Add a note about this claim..."
                rows={3}
                className="block w-full resize-y rounded-lg border border-gray-300 bg-white p-3 text-base leading-6 text-gray-900 placeholder:text-gray-500 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />

            <button type="submit" disabled={saving} className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-60">
                {saving ? "Saving..." : "Add Note"}
            </button>
        </form>
    );
}

export default AddNoteForm;
