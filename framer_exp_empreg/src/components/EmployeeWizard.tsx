"use client"

import { useState } from "react"
import { PlusCircle, Trash2, Edit2, User } from "lucide-react"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"

// Interface for Employee data
interface Employee {
    id: number
    firstName: string
    lastName: string
    email: string
    gender: "Male" | "Female" | "Other"
}

// Main Component
export default function EmployeeWizard() {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
        firstName: "",
        lastName: "",
        email: "",
        gender: "Male"
    })
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

    // Add new employee
    const addEmployee = (e: React.FormEvent) => {
        e.preventDefault()
        if (newEmployee.firstName && newEmployee.lastName && newEmployee.email) {
            setEmployees([...employees, { ...newEmployee, id: Date.now() }])
            setNewEmployee({ firstName: "", lastName: "", email: "", gender: "Male" })
        }
    }

    // Remove employee
    const removeEmployee = (id: number) => setEmployees(employees.filter((emp) => emp.id !== id))

    // Start Editing
    const startEditing = (employee: Employee) => setEditingEmployee(employee)

    // Save Edited Employee
    const saveEmployee = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingEmployee) {
            setEmployees(employees.map((emp) => (emp.id === editingEmployee.id ? editingEmployee : emp)))
            setEditingEmployee(null)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Employees Wizard</h1>
            <div className="grid gap-4 md:grid-cols-2">
                {/* Add Employee Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Employee</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={addEmployee} className="space-y-4">
                            <InputField id="firstName" label="First Name" value={newEmployee.firstName} onChange={(val) => setNewEmployee({ ...newEmployee, firstName: val })} />
                            <InputField id="lastName" label="Last Name" value={newEmployee.lastName} onChange={(val) => setNewEmployee({ ...newEmployee, lastName: val })} />
                            <InputField id="email" label="Email" value={newEmployee.email} type="email" onChange={(val) => setNewEmployee({ ...newEmployee, email: val })} />
                            <GenderSelect value={newEmployee.gender} onChange={(val) => setNewEmployee({ ...newEmployee, gender: val })} />
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Employee List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Employee List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {employees.map((employee) => (
                            <EmployeeCard
                                key={employee.id}
                                employee={employee}
                                onEdit={() => startEditing(employee)}
                                onDelete={() => removeEmployee(employee.id)}
                            />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

// Reusable Components
function InputField({ id, label, value, type = "text", onChange }: any) {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} required />
        </div>
    )
}

function GenderSelect({ value, onChange }: any) {
    return (
        <div>
            <Label>Gender</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

function EmployeeCard({ employee, onEdit, onDelete }: any) {
    return (
        <div className="flex justify-between items-center p-2 border-b">
            <div>
                <h3>{`${employee.firstName} ${employee.lastName}`}</h3>
                <p>{employee.email}</p>
            </div>
            <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={onEdit}>
                    <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onDelete}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
