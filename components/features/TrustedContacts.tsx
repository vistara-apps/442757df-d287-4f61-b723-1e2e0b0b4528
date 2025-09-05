'use client';

import { useState } from 'react';
import { Plus, Phone, Mail, Trash2, Edit } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { TrustedContact } from '@/lib/types';
import { validatePhoneNumber, validateEmail } from '@/lib/utils';

interface TrustedContactsProps {
  contacts: TrustedContact[];
  onContactsChange: (contacts: TrustedContact[]) => void;
}

export function TrustedContacts({ contacts, onContactsChange }: TrustedContactsProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<TrustedContact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddContact = () => {
    setEditingContact(null);
    setFormData({ name: '', phone: '', email: '', relationship: '' });
    setErrors({});
    setShowModal(true);
  };

  const handleEditContact = (contact: TrustedContact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || '',
      relationship: contact.relationship
    });
    setErrors({});
    setShowModal(true);
  };

  const handleDeleteContact = (contactId: string) => {
    const updatedContacts = contacts.filter(c => c.id !== contactId);
    onContactsChange(updatedContacts);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.relationship.trim()) {
      newErrors.relationship = 'Relationship is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveContact = () => {
    if (!validateForm()) return;

    const contactData = {
      id: editingContact?.id || Date.now().toString(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      relationship: formData.relationship.trim()
    };

    let updatedContacts;
    if (editingContact) {
      updatedContacts = contacts.map(c => 
        c.id === editingContact.id ? contactData : c
      );
    } else {
      updatedContacts = [...contacts, contactData];
    }

    onContactsChange(updatedContacts);
    setShowModal(false);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Trusted Contacts</h2>
          <Button
            variant="secondary"
            onClick={handleAddContact}
            className="flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Contact
          </Button>
        </div>

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-blue-200 mb-4">No trusted contacts added yet</p>
            <p className="text-sm text-blue-300 mb-6">
              Add contacts who will receive emergency alerts when you need help
            </p>
            <Button variant="primary" onClick={handleAddContact}>
              Add Your First Contact
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <Card key={contact.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{contact.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-blue-200 text-sm">
                        <Phone size={14} className="mr-1" />
                        {contact.phone}
                      </div>
                      {contact.email && (
                        <div className="flex items-center text-blue-200 text-sm">
                          <Mail size={14} className="mr-1" />
                          {contact.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditContact(contact)}
                      className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors duration-200"
                    >
                      <Edit size={16} className="text-blue-300" />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors duration-200"
                    >
                      <Trash2 size={16} className="text-red-300" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Contact Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingContact ? 'Edit Contact' : 'Add Trusted Contact'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact name"
            />
            {errors.name && (
              <p className="text-red-300 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-300 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Relationship *
            </label>
            <input
              type="text"
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Spouse, Parent, Friend"
            />
            {errors.relationship && (
              <p className="text-red-300 text-sm mt-1">{errors.relationship}</p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveContact}
              className="flex-1"
            >
              {editingContact ? 'Update' : 'Add'} Contact
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
