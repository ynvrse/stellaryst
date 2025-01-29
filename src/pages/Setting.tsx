import ActionDialog from '@/components/ActionDialog';
import LoadingScreen from '@/components/LoadingScreen';
import { PageHeader, PageHeaderHeading } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useSetting from '@/hooks/useStellaryst';
import formatRelativeTime from '@/lib/utils';
import { Stellaryst } from '@/types';
import { Github, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Setting() {
    const { stellaryst, updateApp, loading, resetApp } = useSetting();

    const [isShowGithub, setIsShowGithub] = useState<boolean>(false);

    const [app, setApp] = useState<Stellaryst>({
        appName: stellaryst?.appName || '',
        owner: stellaryst?.owner || '',
        gitHub: stellaryst?.gitHub || '',
        sourceCode: stellaryst?.sourceCode || '',
        createdAt: stellaryst?.createdAt || new Date(),
        updatedAt: stellaryst?.updatedAt || null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setApp((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    useEffect(() => {
        if (stellaryst) {
            setApp(stellaryst);
        }
    }, [stellaryst, updateApp]);

    if (loading) return <LoadingScreen loading={loading} />;

    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Settings Page</PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{isShowGithub ? 'Github Settings' : 'App Settings'}</CardTitle>
                            <CardDescription>
                                {isShowGithub
                                    ? 'Manage your Github informations here.'
                                    : 'Update your app settings here.'}
                            </CardDescription>
                        </div>
                        <div>
                            <Button variant="ghost" size="icon" onClick={() => setIsShowGithub(!isShowGithub)}>
                                {!isShowGithub ? <Github /> : <LayoutGrid />}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        {!isShowGithub ? (
                            <>
                                <Label htmlFor="appName">App Name</Label>
                                <Input
                                    id="appName"
                                    type="text"
                                    value={app.appName}
                                    placeholder="App Name"
                                    onChange={handleInputChange}
                                />
                                <Label htmlFor="owner">Owner</Label>

                                <Input
                                    id="owner"
                                    type="text"
                                    value={app.owner}
                                    placeholder="Owner"
                                    onChange={handleInputChange}
                                />
                            </>
                        ) : (
                            <>
                                <Label htmlFor="gitHub">Github</Label>
                                <Input
                                    id="gitHub"
                                    type="text"
                                    value={app.gitHub}
                                    placeholder="Owner"
                                    onChange={handleInputChange}
                                />

                                <Label htmlFor="sourceCode">Source Code</Label>
                                <Input
                                    id="sourceCode"
                                    type="text"
                                    value={app.sourceCode}
                                    placeholder="Owner"
                                    onChange={handleInputChange}
                                />
                            </>
                        )}

                        <Button onClick={() => updateApp(app)} type="button">
                            Save
                        </Button>

                        <ActionDialog
                            trigger={
                                <Button
                                    variant="destructiveOutline"
                                    // className="border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white"
                                    type="button"
                                >
                                    Factory Reset
                                </Button>
                            }
                            title="Anda Yakin Ingin Reset Aplikasi?"
                            description="Aplikasi Akan Kembali Ke Pengaturan Awal"
                            action={() => resetApp('database')}
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="flex items-center justify-between gap-1">
                <p className="text-muted-foreground text-sm font-light">
                    Dibuat: {`${formatRelativeTime(app.createdAt)}`}
                </p>
                {app.updatedAt && (
                    <p className="text-muted-foreground text-sm">Diubah: {`${formatRelativeTime(app.updatedAt)}`}</p>
                )}
            </div>
        </>
    );
}
