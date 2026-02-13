
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-browser"


export default function AdminLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                throw error
            }

            // Validamos o acesso no servidor / middleware
            /*
            const { data: adminData, error: adminError } = await supabase
                .from('admins')
                .select('id')
                .eq('id', data.user.id)
                .single()

            if (adminError || !adminData) {
                await supabase.auth.signOut()
                throw new Error("Usuário não tem permissão de administrador.")
            }
            */

            // Forçar recarregamento para garantir que o middleware reconheça o cookie de sessão
            router.refresh()
            await new Promise(resolve => setTimeout(resolve, 500)) // Pequeno delay para propagação
            window.location.href = '/admin'
        } catch (err: any) {
            setError(err.message || "Erro ao fazer login")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login Admin</CardTitle>
                    <CardDescription>
                        Entre com suas credenciais para acessar o painel.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@antecipy.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="text-sm text-destructive font-medium bg-destructive/10 p-2 rounded">
                                {error}
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-2 rounded">
                            <AlertCircle className="h-4 w-4" />
                            <span>Acesso restrito a administradores.</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Entrar"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
