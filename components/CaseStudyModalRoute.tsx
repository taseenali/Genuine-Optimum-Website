"use client";

import { useRouter } from "next/navigation";
import CaseStudyModal from "@/components/CaseStudyModal";
import CaseStudyEmbed from "@/components/CaseStudyEmbed";

/** Renders a standaloneHtml case study as the same modal used from /work, so a
 * direct link or a page refresh looks identical to clicking through from the
 * work grid rather than falling back to a bare, differently-styled page. */
export default function CaseStudyModalRoute({ src }: { src: string }) {
    const router = useRouter();

    return (
        <CaseStudyModal wide onClose={() => router.push("/work")}>
            <CaseStudyEmbed src={src} />
        </CaseStudyModal>
    );
}
