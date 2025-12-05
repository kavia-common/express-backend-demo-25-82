const { v4: uuidv4 } = require('uuid');

/**
 * Simple in-memory store for items.
 * Each item has shape: { id: string, name: string, description?: string, createdAt: ISOString, updatedAt: ISOString }
 */
const itemsStore = (() => {
  const items = [
    { id: uuidv4(), name: 'Alpha', description: 'First item', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: uuidv4(), name: 'Bravo', description: 'Second item', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: uuidv4(), name: 'Charlie', description: 'Third item', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];
  return {
    list: () => items,
    get: (id) => items.find((i) => i.id === id),
    create: (data) => {
      const now = new Date().toISOString();
      const newItem = { id: uuidv4(), name: data.name, description: data.description || '', createdAt: now, updatedAt: now };
      items.push(newItem);
      return newItem;
    },
    update: (id, data) => {
      const idx = items.findIndex((i) => i.id === id);
      if (idx === -1) return null;
      const now = new Date().toISOString();
      items[idx] = { ...items[idx], ...data, updatedAt: now };
      return items[idx];
    },
    remove: (id) => {
      const idx = items.findIndex((i) => i.id === id);
      if (idx === -1) return null;
      const [removed] = items.splice(idx, 1);
      return removed;
    },
  };
})();

class ItemsController {
  // PUBLIC_INTERFACE
  /**
   * List all items.
   */
  list(req, res) {
    return res.status(200).json(itemsStore.list());
  }

  // PUBLIC_INTERFACE
  /**
   * Get one item by id.
   */
  getById(req, res) {
    const { id } = req.params;
    const item = itemsStore.get(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    return res.status(200).json(item);
  }

  // PUBLIC_INTERFACE
  /**
   * Create an item with validation of required fields.
   */
  create(req, res) {
    const { name, description } = req.body || {};
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Validation error', details: [{ field: 'name', message: 'name is required and must be a non-empty string' }] });
    }
    const created = itemsStore.create({ name: name.trim(), description });
    return res.status(201).json(created);
  }

  // PUBLIC_INTERFACE
  /**
   * Update an existing item by id.
   */
  update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body || {};
    const payload = {};
    if (typeof name !== 'undefined') {
      if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ error: 'Validation error', details: [{ field: 'name', message: 'name must be a non-empty string when provided' }] });
      }
      payload.name = name.trim();
    }
    if (typeof description !== 'undefined') {
      if (description !== null && typeof description !== 'string') {
        return res.status(400).json({ error: 'Validation error', details: [{ field: 'description', message: 'description must be a string when provided' }] });
      }
      payload.description = description;
    }
    const updated = itemsStore.update(id, payload);
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    return res.status(200).json(updated);
  }

  // PUBLIC_INTERFACE
  /**
   * Delete an item by id.
   */
  remove(req, res) {
    const { id } = req.params;
    const removed = itemsStore.remove(id);
    if (!removed) return res.status(404).json({ error: 'Item not found' });
    return res.status(204).send();
  }
}

module.exports = new ItemsController();
