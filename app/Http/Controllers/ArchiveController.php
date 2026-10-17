<?php

namespace App\Http\Controllers;

use App\Models\Archive;
use App\Models\ArchiveType;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArchiveController extends Controller
{
    /**
     * Display a listing of archives.
     */
    public function index(Request $request)
    {
        $archives = Archive::query()
            ->with([
                'category',
                'archiveType',
                'unit',
                'uploader',
                'tags',
            ])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query
                        ->where('archive_number', 'like', "%{$search}%")
                        ->orWhere('subject', 'like', "%{$search}%")
                        ->orWhere('sender', 'like', "%{$search}%")
                        ->orWhere('recipient', 'like', "%{$search}%");
                });
            })
            ->when($request->category_id, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($request->archive_type_id, function ($query, $archiveTypeId) {
                $query->where('archive_type_id', $archiveTypeId);
            })
            ->when($request->unit_id, function ($query, $unitId) {
                $query->where('unit_id', $unitId);
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest('document_date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('archives/index', [
            'archives' => $archives,
            'filters' => [
                'search' => $request->search,
                'category_id' => $request->category_id,
                'archive_type_id' => $request->archive_type_id,
                'unit_id' => $request->unit_id,
                'status' => $request->status,
            ],
            'categories' => Category::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),

            'archiveTypes' => ArchiveType::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),

            'units' => Unit::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),

            'tags' => Tag::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Show the form for creating a new archive.
     */
    public function create()
    {
        return Inertia::render('archives/create', [
            'categories' => Category::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),

            'archiveTypes' => ArchiveType::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),

            'units' => Unit::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),

            'tags' => Tag::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created archive.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'archive_number' => ['required', 'string', 'max:255', 'unique:archives,archive_number'],
            'document_date' => ['required', 'date'],
            'subject' => ['required', 'string', 'max:255'],
            'sender' => ['nullable', 'string', 'max:255'],
            'recipient' => ['nullable', 'string', 'max:255'],
            'archive_type_id' => ['nullable', 'exists:archive_types,id'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'unit_id' => ['nullable', 'exists:units,id'],
            'status' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['integer', 'exists:tags,id'],
        ]);

        $tagIds = $validated['tags'] ?? [];

        unset($validated['tags']);

        $archive = Archive::create([
            ...$validated,
            'uploaded_by' => $request->user()->id,
        ]);

        $archive->tags()->sync($tagIds);

        return to_route('archives.index')
            ->with('success', 'Arsip berhasil ditambahkan.');
    }

    /**
     * Display the specified archive.
     */
    public function show(Archive $archive)
    {
        $archive->load([
            'category',
            'archiveType',
            'unit',
            'uploader',
            'tags',
        ]);

        return Inertia::render('archives/show', [
            'archive' => $archive,
        ]);
    }

    /**
     * Show the form for editing the specified archive.
     */
    public function edit(Archive $archive)
    {
        $archive->load('tags');

        return Inertia::render('archives/edit', [
            'archive' => $archive,

            'categories' => Category::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),

            'archiveTypes' => ArchiveType::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),

            'units' => Unit::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),

            'tags' => Tag::where('status', true)
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Update the specified archive.
     */
    public function update(Request $request, Archive $archive)
    {
        $validated = $request->validate([
            'archive_number' => [
                'required',
                'string',
                'max:255',
                'unique:archives,archive_number,'.$archive->id,
            ],
            'document_date' => ['required', 'date'],
            'subject' => ['required', 'string', 'max:255'],
            'sender' => ['nullable', 'string', 'max:255'],
            'recipient' => ['nullable', 'string', 'max:255'],
            'archive_type_id' => ['nullable', 'exists:archive_types,id'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'unit_id' => ['nullable', 'exists:units,id'],
            'status' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['integer', 'exists:tags,id'],
        ]);

        $tagIds = $validated['tags'] ?? [];

        unset($validated['tags']);

        $archive->update($validated);

        $archive->tags()->sync($tagIds);

        return to_route('archives.index')
            ->with('success', 'Arsip berhasil diperbarui.');
    }

    /**
     * Remove the specified archive.
     */
    public function destroy(Archive $archive)
    {
        $archive->delete();

        return to_route('archives.index')
            ->with('success', 'Arsip berhasil dihapus.');
    }
}
