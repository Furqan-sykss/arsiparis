<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Archive extends Model
{
    use HasFactory;

    protected $fillable = [
        'archive_number',
        'document_date',
        'subject',
        'sender',
        'recipient',
        'archive_type_id',
        'category_id',
        'unit_id',
        'status',
        'description',
        'uploaded_by',
    ];

    protected function casts(): array
    {
        return [
            'document_date' => 'date',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function archiveType(): BelongsTo
    {
        return $this->belongsTo(ArchiveType::class);
    }

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(
            Tag::class,
            'archive_tag',
            'archive_id',
            'tag_id'
        );
    }
}
