import ResourceFactory from './base';

export class Task extends ResourceFactory.createResource('tasks') {}
export class TaskEntry extends ResourceFactory.createResource('task-entries') {}
export class TaskActivity extends ResourceFactory.createResource('task-activities') {}

export class QueuedTask extends ResourceFactory.createResource('queued-tasks') {}
export class QueuedTaskEntry extends ResourceFactory.createResource('queued-task-entries') {}

export class EnumeratedStreet extends ResourceFactory.createResource('enumerated-streets') {}
export class ActiveAgent extends ResourceFactory.createResource('active-agents') {}

export class Profile extends ResourceFactory.createResource('profile') {}

export class User extends ResourceFactory.createResource('users') {}
export class Role extends ResourceFactory.createResource('roles') {}

export class Analytics extends ResourceFactory.createResource('analytics') {}

export class Login extends ResourceFactory.createResource('login') {}
export class SignUp extends ResourceFactory.createResource('signup') {}

export class Bank extends ResourceFactory.createResource('banks') {}

export class Country extends ResourceFactory.createResource('countries') {}
export class State extends ResourceFactory.createResource('states') {}
export class City extends ResourceFactory.createResource('cities') {}
export class Street extends ResourceFactory.createResource('streets') {}
export class District extends ResourceFactory.createResource('districts') {}

export class Bill extends ResourceFactory.createResource('bills') {}
export class Payment extends ResourceFactory.createResource('payments') {}
export class Transaction extends ResourceFactory.createResource('transactions') {}

export class Tag extends ResourceFactory.createResource('tags') {}

export class Agency extends ResourceFactory.createResource('agencies') {}
export class Property extends ResourceFactory.createResource('properties') {}
export class PropertyBill extends ResourceFactory.createResource('property-bills') {}
export class PreviousPropertyBill extends ResourceFactory.createResource('previous-property-bills') {}
export class PropertyType extends ResourceFactory.createResource('property-types') {}
export class PropertyStatus extends ResourceFactory.createResource('property-statuses') {}

export class RegisterProperty extends ResourceFactory.createResource('register-property') {}
