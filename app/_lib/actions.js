"use server";

import { signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signInGithub() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function signInFacebook() {
  await signIn("facebook", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
