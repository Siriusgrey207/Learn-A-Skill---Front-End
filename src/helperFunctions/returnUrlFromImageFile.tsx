export default function returnUrlFromImageFile(files: FileList | null): string {
    if (files?.[0]) {
        const file = files[0];

        // Validate that the file is an image
        if (file.type.startsWith("image/")) {
            const imgUrl = URL.createObjectURL(file);

            // Optional: Revoke object URL later when no longer needed to avoid memory leaks
            // Example: URL.revokeObjectURL(imgUrl);

            return imgUrl;
        } else {
            console.warn("The selected file is not an image.");
        }
    }
    return "";
}
