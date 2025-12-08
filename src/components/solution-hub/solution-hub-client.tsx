// @ts-nocheck
'use client';
import { useActionState, useEffect, useState, useRef } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Sparkles,
  Check,
} from 'lucide-react';
import { getAutomationInsights, getSolutions } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { DecisionSupportDashboard } from './decision-support-dashboard';
import { Icons } from '../icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const solutionInitialState = { message: '', error: null, solution: null };
const insightsInitialState = { message: '', error: null, insights: null };

export function SolutionHubClient() {
  const [solutionState, submitSolutionAction, isSolutionPending] =
    useActionState(getSolutions, solutionInitialState);
  const [insightsState, submitInsightsAction, isInsightsPending] =
    useActionState(getAutomationInsights, insightsInitialState);

  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState<{
    title: string;
    description: string;
    variant: 'default' | 'destructive';
    icon: React.ReactNode;
  } | null>(null);

  const { toast } = useToast();
  const solutionFormRef = useRef<HTMLFormElement>(null);
  const insightsFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (solutionState.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: solutionState.error,
      });
    }
    if (solutionState.solution) {
      setAlert({
        title: 'Solution Generated!',
        description:
          'A set of technology-driven solutions has been generated for your problem.',
        variant: 'default',
        icon: <Lightbulb className="h-4 w-4" />,
      });
      setProgress(0);
    }
  }, [solutionState, toast]);

  useEffect(() => {
    if (insightsState.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: insightsState.error,
      });
    }
  }, [insightsState, toast]);

  const handleProgressChange = (newProgress: number) => {
    setProgress(newProgress);
    if (newProgress > 0 && newProgress < 100) {
      setAlert({
        title: 'Implementation In Progress',
        description: `Your solution implementation is now ${newProgress}% complete.`,
        variant: 'default',
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } else if (newProgress === 100) {
      setAlert({
        title: 'Implementation Complete!',
        description:
          'Congratulations! You can now view the decision support dashboard.',
        variant: 'default',
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    }
  };

  const handleNewProblem = () => {
    solutionFormRef.current?.reset();
    insightsFormRef.current?.reset();
    
    // Manually call actions with null form data to reset states
    submitSolutionAction(new FormData());
    submitInsightsAction(new FormData());

    setProgress(0);
    setAlert(null);
  };

  return (
    <div className="grid gap-8">
      <Card className="animate-in fade-in-0 duration-500">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">
            Describe Your Problem
          </CardTitle>
          <CardDescription>
            Submit a real-world problem you are facing, and our AI will suggest
            technology-driven solutions to help you solve it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={solutionFormRef} action={submitSolutionAction} className="grid gap-4">
            <Textarea
              name="problem"
              placeholder="For example: 'Managing inventory for my small retail business is time-consuming and prone to errors...'"
              className="min-h-[120px] text-base"
              disabled={isSolutionPending || !!solutionState.solution}
            />
            <div className="flex justify-end gap-2">
              {solutionState.solution && (
                 <Button type="button" variant="outline" onClick={handleNewProblem}>
                    Start Over
                 </Button>
              )}
              <Button type="submit" disabled={isSolutionPending || !!solutionState.solution}>
                {isSolutionPending ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Solutions <Sparkles className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isSolutionPending && (
         <div className="flex items-center justify-center rounded-lg border border-dashed p-12 text-muted-foreground">
            <Icons.spinner className="mr-4 h-8 w-8 animate-spin" />
            <span className="text-lg">Analyzing your problem and crafting solutions...</span>
        </div>
      )}

      {solutionState.solution && (
        <div className="grid gap-8 animate-in fade-in-0 duration-700">
          {alert && (
            <Alert variant={alert.variant} className="bg-card">
              {alert.icon}
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Lightbulb className="text-primary" /> Suggested Solutions
              </CardTitle>
              <CardDescription>
                Here are some technology-driven solutions for your problem.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {solutionState.solution.map((solution, index) => (
                  <div key={index} className="rounded-lg border bg-background/50 p-6">
                    <h3 className="mb-2 text-xl font-bold font-headline">{solution.title}</h3>
                    <p className="mb-4 text-muted-foreground">{solution.description}</p>
                    <h4 className="mb-3 font-semibold">Key Features:</h4>
                    <ul className="space-y-2">
                      {solution.keyFeatures.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <Check className="mr-2 mt-1 h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Separator />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span className="font-semibold">
                      Want to automate these tasks?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Discover how these solutions can automate your workflow.
                        Click the button below to get real-time insights.
                      </p>
                      <form
                        ref={insightsFormRef}
                        action={submitInsightsAction}
                      >
                        <input
                          type="hidden"
                          name="solution"
                          value={JSON.stringify(solutionState.solution)}
                        />
                        <Button
                          type="submit"
                          size="sm"
                          variant="secondary"
                          disabled={isInsightsPending || !!insightsState.insights}
                        >
                          {isInsightsPending ? (
                            <>
                              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                              Getting Insights...
                            </>
                          ) : (
                            <>
                              Get Automation Insights{' '}
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                      {insightsState.insights && (
                        <div className="mt-4 rounded-md border bg-background p-4 animate-in fade-in-0 duration-500">
                           <div
                              className="prose prose-sm dark:prose-invert max-w-none"
                              dangerouslySetInnerHTML={{ __html: insightsState.insights.replace(/\n/g, '<br />') }}
                            />
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Track the progress of implementing your chosen solution.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Getting Started</span>
                <span>In Progress</span>
                <span>Completed</span>
              </div>
              <div className="flex justify-center gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleProgressChange(25)}
                  disabled={progress >= 25}
                >
                  Start
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleProgressChange(50)}
                  disabled={progress >= 50}
                >
                  Reach 50%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleProgressChange(100)}
                  disabled={progress === 100}
                >
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>

          {progress === 100 && (
            <div className="animate-in fade-in-0 duration-700">
              <DecisionSupportDashboard />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
