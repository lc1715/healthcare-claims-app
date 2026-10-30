'use client'

import { useState } from "react";
import { Note } from "./NotesSection";


interface NoteItemProps {
    note: Note;
    fetchNotes: () => void;
}

/**
 * Displays a single note with options to edit or delete it.
 * Refreshes the notes list after a successful update or deletion.
 */
function NoteItem({ note, fetchNotes }: NoteItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(note.content);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Deletes the selected note
    async function handleDelete() {
        try {
            const res = await fetch(`/api/claims/${note.claimId}/notes/${note.id}`, {
                method: 'DELETE'
            })

            if (!res.ok) { throw new Error('Failed to delete note') }

            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    }

    // Updates an existing note in the database
    async function handleSave() {
        try {
            const res = await fetch(`/api/claims/${note.claimId}/notes/${note.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: editedContent })
            });

            if (!res.ok) { throw new Error('Failed to update note') }

            setIsEditing(false);
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="rounded-xl border border-gray-300 bg-gray-50 p-4">
            {isEditing ? (
                <>
                    <textarea
                        value={editedContent}
                        onChange={(evt) => setEditedContent(evt.target.value)}
                        rows={3}
                        className="w-full resize-y rounded-lg border border-gray-300 bg-white p-3 text-base leading-6 text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />

                    <div className="mt-4 flex flex-wrap gap-2">
                        <button onClick={handleSave} className="rounded-full bg-gray-900 px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-gray-600">
                            Save
                        </button>

                        <button onClick={() => { setEditedContent(note.content); setIsEditing(false) }} className="rounded-full border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100">
                            Cancel
                        </button>
                    </div>
                </>
            )
                : (
                    <>
                        <p>{note.content}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <button onClick={() => setIsEditing(true)} className="rounded-full border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100">
                                Edit
                            </button>

                            <button onClick={() => setShowDeleteConfirm(true)} className="rounded-full border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-red-700 transition-colors hover:bg-red-50">
                                Delete
                            </button>
                        </div>

                        {showDeleteConfirm && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                                <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
                                    <h2 className="text-lg font-semibold">Delete note?</h2>
                                    <p className="mt-2">Are you sure you want to delete this note? This action cannot be undone.</p>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <button onClick={() => setShowDeleteConfirm(false)} className="rounded-full border border-gray-300 bg-white px-4 py-1.5 2xl:text-[15px] font-medium text-gray-900 transition-colors hover:bg-gray-100">
                                            Cancel
                                        </button>

                                        <button onClick={handleDelete} className="rounded-full bg-red-600 px-4 py-1.5 2xl:text-[15px] font-medium text-white transition-colors hover:bg-red-700">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )
            }
        </div >
    );
}

export default NoteItem;