import { useState } from "react";
import {
  Anchor,
  Button,
  Center,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  loginWithEmail,
  registerWithEmail,
  signInWithGoogle,
} from "../services/auth.services";

function SignIn() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    initialValues: { name: "", email: "", password: "" },
    validate: {
      name: (value) =>
        isRegistering && !value.trim() ? "Enter a display name" : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Enter a valid email",
      password: (value) =>
        value.length < 6 ? "Use at least 6 characters" : null,
    },
  });

  const switchMode = () => {
    setIsRegistering((current) => !current);
    form.reset();
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const result = isRegistering
      ? await registerWithEmail(values.email, values.password, values.name)
      : await loginWithEmail(values.email, values.password);

    setIsSubmitting(false);
    if (!result.success) {
      setStatus({ type: "error", message: result.error });
      return;
    }

    setStatus({
      type: "success",
      message: isRegistering ? "Your account is ready." : "Welcome back.",
    });
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    const result = await signInWithGoogle();
    if (result?.success === false) {
      setStatus({ type: "error", message: result.error });
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="auth-page"
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        gap: "10rem",
      }}
    >
      <Center className="auth-intro" visibleFrom="sm">
        <Stack gap="xs">
          <Text c="orange.7" fw={800} size="xs" tt="uppercase" lts="0.15em">
            GamerDash
          </Text>
          <Title order={1}>Keep your games in play.</Title>
          <Text c="dimmed" maw={330}>
            One home for your library, progress, and next great session.
          </Text>
        </Stack>
      </Center>

      <Paper
        className="auth-panel"
        radius="md"
        p={{ base: "xl", sm: 42 }}
        withBorder
        shadow="md"
      >
        <Stack gap="lg">
          <Stack gap={4}>
            <Text c="orange.7" fw={800} size="xs" tt="uppercase" lts="0.12em">
              {isRegistering ? "New player" : "Welcome back"}
            </Text>
            <Title order={2}>
              {isRegistering
                ? "Create your account"
                : "Sign in to your dashboard"}
            </Title>
            <Text c="dimmed" size="sm">
              {isRegistering
                ? "Start building your personal game space."
                : "Pick up exactly where you left off."}
            </Text>
          </Stack>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              {isRegistering && (
                <TextInput
                  label="Display name"
                  placeholder="Player name"
                  {...form.getInputProps("name")}
                />
              )}
              <TextInput
                label="Email address"
                placeholder="you@example.com"
                type="email"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="At least 6 characters"
                {...form.getInputProps("password")}
              />
              <Button
                type="submit"
                color="dark"
                fullWidth
                loading={isSubmitting}
                size="md"
              >
                {isRegistering ? "Create account" : "Sign in"}
              </Button>
            </Stack>
          </form>

          <Divider label="or continue with" labelPosition="center" />
          <Button
            variant="default"
            fullWidth
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            leftSection={
              <Text fw={900} c="orange.7">
                G
              </Text>
            }
          >
            Google
          </Button>

          {status.message && (
            <Text
              c={status.type === "error" ? "red" : "green"}
              size="sm"
              role="status"
            >
              {status.message}
            </Text>
          )}
          <Group justify="center" gap={5}>
            <Text c="dimmed" size="sm">
              {isRegistering ? "Already have an account?" : "New to GamerDash?"}
            </Text>
            <Anchor
              component="button"
              type="button"
              size="sm"
              fw={700}
              onClick={switchMode}
            >
              {isRegistering ? "Sign in" : "Create one"}
            </Anchor>
          </Group>
        </Stack>
      </Paper>
    </main>
  );
}

export default SignIn;
